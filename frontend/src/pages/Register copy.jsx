import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Select from 'react-select';

const Register = () => {
  const navigate = useNavigate();
  const Registration = async ({ username, password, email, role }) => {
    const response = await fetch('http://localhost:8443/api/auth/signup', {
      method: 'POST',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
        role,
      }),
    });
    if (response.status === 200) {
      toast.success('Successfully registered!');
      navigate('/login');
    } else {
      toast.error('Registration failed!');
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      role: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at least 3 characters'),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'passwords must match',
      ),
      email: Yup.string().required('Email is required').email('Email is invalid'),
      role: Yup.array().of(
        Yup.object().shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        }),
      ),
    }),
    onSubmit: (values) => {
      Registration(values);
    },
  });
  return (
    <div className="h-screen flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">Atelier DevOps</h1>
          <h2 className="text-white font-bold text-2xl font-sans text-center">
            Création du compte
          </h2>
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white" />
      <div className="flex w-1/2 justify-center items-center bg-white">
        <form
          className="bg-white"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}>
          <h2 className="text-gray-800 font-bold text-2xl mb-3">Create an account</h2>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl relative mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-64"
              type="text"
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Username"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="absolute text-red-500 text-xs font-bold">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl relative mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-64"
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="absolute text-red-500 text-xs font-bold">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl relative mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-64"
              type="passwordConfirmation"
              name="passwordConfirmation"
              id="passwordConfirmation"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password confirmation"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="absolute -bottom-6 text-sm text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl relative mb-8">
            <input
              className="pl-2 outline-none border-none w-64"
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="absolute text-red-500 text-xs font-bold">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl relative mb-8">
            <Select
              className="pl-2 outline-none border-none w-64"
              isMulti
              name="role"
              id="role"
              value={formik.values.role}
              onChange={(selectedOption) => formik.setFieldValue('role', selectedOption)}
              onBlur={formik.handleBlur}
              placeholder="Role"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'moderator', label: 'Moderator' },
              ]}
            />
            {formik.touched.role && formik.errors.role ? (
              <div className="absolute text-red-500 text-xs font-bold">
                {formik.errors.role}
              </div>
            ) : null}
          </div>
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl"
            type="submit">
            Sign up
          </button>
          <NavLink
            to="/login"
            className="text-purple-700 hover:text-purple-800 font-bold py-2 px-4 rounded-2xl">
            Already have an account?
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Register;
