create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view their own roles"
on public.user_roles for select to authenticated
using (auth.uid() = user_id);

create policy "Admins can manage roles"
on public.user_roles for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create table public.gallery_posts (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  public_id text not null,
  caption text,
  category text default 'General',
  tags text[],
  created_at timestamptz not null default now(),
  is_active boolean not null default true
);

grant select on public.gallery_posts to anon, authenticated;
grant insert, update, delete on public.gallery_posts to authenticated;
grant all on public.gallery_posts to service_role;

alter table public.gallery_posts enable row level security;

create policy "Public can view active gallery posts"
on public.gallery_posts for select to anon, authenticated
using (is_active = true or public.has_role(auth.uid(), 'admin'));

create policy "Admin can insert gallery posts"
on public.gallery_posts for insert to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admin can update gallery posts"
on public.gallery_posts for update to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admin can delete gallery posts"
on public.gallery_posts for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

create table public.instagram_embeds (
  id uuid primary key default gen_random_uuid(),
  post_url text not null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

grant select on public.instagram_embeds to anon, authenticated;
grant insert, update, delete on public.instagram_embeds to authenticated;
grant all on public.instagram_embeds to service_role;

alter table public.instagram_embeds enable row level security;

create policy "Public can view active instagram embeds"
on public.instagram_embeds for select to anon, authenticated
using (is_active = true or public.has_role(auth.uid(), 'admin'));

create policy "Admin can insert instagram embeds"
on public.instagram_embeds for insert to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admin can update instagram embeds"
on public.instagram_embeds for update to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admin can delete instagram embeds"
on public.instagram_embeds for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

create or replace function public.grant_admin_on_signup()
returns trigger language plpgsql security definer
set search_path = public as $$
begin
  if new.email_confirmed_at is not null and lower(new.email) = 'pasaravananlic@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_grant_admin
after insert on auth.users
for each row execute function public.grant_admin_on_signup();

create trigger on_auth_user_confirmed_grant_admin
after update of email_confirmed_at on auth.users
for each row
when (old.email_confirmed_at is null and new.email_confirmed_at is not null)
execute function public.grant_admin_on_signup();