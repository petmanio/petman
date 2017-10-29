import config from '../../config';
import { FbUser } from '../../../common/models/user.model';
import { AuthProvider } from '../../models/AuthProvider';
import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { AuthProviderType } from '../../../common/enums/index';

const { Facebook, FacebookApiException } = require('fb');

const fb = new Facebook({
  appId: config.fb.appId,
  appSecret: config.fb.appSecret
});

const loginService = (body): any => {
};

const getUserFbDataByAccessToken = async (token: string) => {
  fb.setAccessToken(token);
  const res: FbUser | any = await fb.api('me', {fields: 'email,gender,first_name,last_name'});
  if (res.error) {
    throw new Error(res.error);
  }
  return res;
};

const findOrCreateFbUser = async (fbUser: FbUser, accessToken: string) => {
  const auth = await AuthProvider.findOne<AuthProvider>({
    where: {externalId: fbUser.id}, include: [{
      model: User,
      include: [UserData, {model: User, as: 'businessUsers', include: [UserData, AuthProvider]}]
    }]
  });
  if (auth) {
    auth.set('accessToken', accessToken);
    await auth.save();
    return auth.user;
  }
  const user = new User({
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
    }]
  }, {include: [UserData, AuthProvider]});
  return await user.save();
};

export { loginService, getUserFbDataByAccessToken, findOrCreateFbUser };
