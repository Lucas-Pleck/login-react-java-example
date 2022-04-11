import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const loggedIn = async ({ username, password }) => {
    const result = await fetch('http://localhost:8443/api/auth/signin', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (result.status == 200) {
      toast.success('Connected');
      navigate('/');
    } else {
      toast.error('connexion error');
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at least 3 characters'),
    }),
    onSubmit: (values) => {
      loggedIn(values);
    },
  });
  return (
    <div className="h-screen flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">Atelier DevOps</h1>
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white">
        <form
          className="bg-white"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}>
          <h1 className="text-gray-800 font-bold text-2xl mb-3">Bienvenue</h1>
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
              placeholder="Nom d'utilisateur"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="absolute -bottom-6 text-sm text-red-600">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl relative">
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
              placeholder="Mot de passe"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="absolute -bottom-6 text-sm text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-12 py-2 rounded-2xl text-white font-semibold mb-2 text-center">
            Se connecter
          </button>
          <NavLink
            className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
            to="/register">
            Créer un compte
          </NavLink>
        </form>
      </div>
    </div>
  );
};
export default Login;
