import React  from "react";
import { Link } from 'react-router-dom';
import { GoogleLoginButton } from "react-social-login-buttons";
import firebase from "firebase";

import Header from './partials/Header';
import { useHistory } from "react-router-dom";

const auth = firebase.auth();


function SignIn() {

  const history = useHistory();

  const _onClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      history.push("/trips");
    } catch (error) {
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Content de te revoir ! Connecte toi pour préparer ton prochain voyage</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input id="email" type="email" className="form-input w-full text-gray-800" placeholder="Entrer votre email" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Mot de passe</label>
                      </div>
                      <input id="password" type="password" className="form-input w-full text-gray-800" placeholder="Entrer votre mot de passe" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">Rester connecter</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Se connecter</button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>
                <form>

                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                    <GoogleLoginButton onClick={_onClick}>Connexion avec Google</GoogleLoginButton>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
                  Tu n'as pas de compte? <Link to="/register" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Inscrit toi</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default SignIn;