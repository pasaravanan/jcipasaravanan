-- Grant select on user_roles to anon to prevent 403 Forbidden errors during auth transitions
grant select on public.user_roles to anon;

-- Drop existing policy and recreate to include anon
drop policy if exists "Users can view their own roles" on public.user_roles;

create policy "Users can view their own roles"
on public.user_roles for select to anon, authenticated
using (auth.uid() = user_id);

-- Grant execute on has_role function to anon and authenticated roles
grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated;
