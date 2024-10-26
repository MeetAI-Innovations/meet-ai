import { Strategy as GoogleStratergy, StrategyOptions} from "passport-google-oauth20";
import { Strategy as GithubStratergy } from "passport-github2";
import { handleOAuth } from "./handleOAuth";
import { githubId, githubSecret, googleId, googleSecret } from "./envConfig";


const googleStratergy = new GoogleStratergy(
  {
    clientID: googleId!,
    clientSecret:googleSecret!,
    callbackURL:'http://localhost:5000/api/v1/user/oauth/google',
    passReqToCallback: true,
  } ,
  function (req: any, token: any, refreshToken: any, profile: any, cb: (err: any, user?: any) => void) {
    handleOAuth(req, profile, cb,req.query.state);
  }
);

const githubStratergy = new GithubStratergy(
    {
        clientID:githubId!,
        clientSecret:githubSecret!,
        callbackURL:`http://localhost:5000/api/v1/user/oauth/github`,
        passReqToCallback:true
    },
    function(req: any, token: any, refreshToken: any, profile: any, cb: (err: any, user?: any) => void ){
        handleOAuth(req, profile, cb, req.query.action)
    }
)

export{
    googleStratergy,
    githubStratergy
}