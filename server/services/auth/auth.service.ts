import { Facebook, FacebookApiException } from 'fb';
import { sign } from 'jsonwebtoken';
import config from '../../config';
import { FbUser } from '../../../common/models/user';
import { AuthProvider } from '../../models/AuthProvider';
import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { AuthProviderType } from '../../../common/enums/index';

const fb = new Facebook({
  appId:          config.fb.appId,
  appSecret:      config.fb.appSecret
});

const loginService = (body): any => {
};

const getUserFbDataByAccessToken = async (token: string) => {
  fb.setAccessToken(token);
  const res: FbUser | any = await fb.api('me', { fields: 'email,gender,first_name,last_name' });
  if (res.error) {
    throw new Error(res.error);
  }

  return res;
};

const findOrCreateFbUser = async (fbUser: FbUser, accessToken: string) => {
  const auth = await AuthProvider.findOne<AuthProvider>({ where: { externalId: fbUser.id }, include: [ User ] });
  if (auth) {
    auth.set('accessToken', accessToken);
    await auth.save();
    return await User.findById(auth.userId);
  }
  let user = new User({
    email: fbUser.email,
    userData: {
      gender: fbUser.gender.toUpperCase(),
      firstName: fbUser.first_name,
      lastName: fbUser.last_name,
    },
    authProviders: [{
      type: AuthProviderType.FACEBOOK,
      externalId: fbUser.id,
      accessToken,
    }]}, { include: [UserData, AuthProvider] });
  user = await user.save();
  return user;
};

const signUserId = (id: number): string =>  {
  return sign({ id }, config.secret, { expiresIn: 60 * 60 * 24 * 30 });
};

export { loginService, getUserFbDataByAccessToken, findOrCreateFbUser, signUserId };
