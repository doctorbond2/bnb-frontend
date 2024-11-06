'use client';
import { RegisterFormData } from '@/models/interfaces/user';
import { sendRequest } from '@/lib/helpers/fetch';
import ROUTES from '@/lib/routes';
export default function CreateAdminForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: RegisterFormData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      repeat_password: formData.get('repeat_password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      username: formData.get('username') as string,
      admin_password: formData.get('admin_password') as string,
      admin: true,
    };

    const response = await sendRequest({
      url: ROUTES.SECRET_ROUTE,
      method: 'POST',
      body: { ...data },
    });
    console.log('response:', response);
  };
  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <label htmlFor="repeat_password">Repeat Password</label>
        <input type="password" name="repeat_password" />
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="admin_password">Admin Password</label>
        <input type="password" name="admin_password" />

        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
}
