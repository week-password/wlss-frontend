export enum EAvatarType {
  profile = 'profile',
  wish = 'wish',
}

export const AvatarSources: { [key in EAvatarType]: string } = {
  profile: 'assets/icons/default-user-avatar.svg',
  wish: 'assets/icons/default-wish-avatar.svg'
};
