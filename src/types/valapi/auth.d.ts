export type idTokenDecrypt = {
  at_hash:               string;
  sub:                   string;
  country:               string;
  player_plocale:        string;
  country_at:            number;
  amr:                   string[];
  iss:                   string;
  lol:                   Lol[];
  phone_number_verified: boolean;
  locale:                string;
  nonce:                 string;
  account_verified:      boolean;
  aud:                   string;
  acr:                   string;
  lol_region:            null;
  player_locale:         string;
  exp:                   number;
  iat:                   number;
  acct:                  Acct;
  age:                   number;
  jti:                   string;
  login_country:         string;
}

export type Acct = {
  game_name: string;
  tag_line:  string;
}

export type Lol = {
  cuid:  number;
  cpid:  string;
  uid:   number;
  uname: string;
  ptrid: null;
  pid:   string;
  state: string;
}

export type accessTokenDecrypt = {
  pp:  Pp;
  sub: string;
  scp: string[];
  clm: string[];
  dat: DAT;
  iss: string;
  plt: PLT;
  exp: number;
  iat: number;
  jti: string;
  cid: string;
}

export type DAT = {
  p:   null;
  r:   string;
  c:   string;
  u:   number;
  lid: string;
}

export type PLT = {
  dev: string;
  id:  string;
}

export type Pp = {
  c: string;
}