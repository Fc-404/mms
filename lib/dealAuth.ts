/**
 * Encoding password
 */

import md5 from "crypto-js/md5";

export function encodingPswd(pswd: string): string {
  const date = new Date();
  return md5(
    pswd +
      date.getFullYear() +
      date.getMonth() +
      date.getDate() +
      date.getHours() +
      date.getMinutes()
  ).toString();
}

export function verifyPswd(pswd: string, pswdHash: string): boolean {
  const date = new Date();
  return (
    md5(
      pswd +
        date.getFullYear() +
        date.getMonth() +
        date.getDate() +
        date.getHours() +
        date.getMinutes()
    ).toString() === pswdHash ||
    md5(
      pswd +
        date.getFullYear() +
        date.getMonth() +
        date.getDate() +
        date.getHours() +
        (date.getMinutes() - 1)
    ).toString() === pswdHash
  );
}

export function generateToken(user: string, pswd: string): string {
  return Buffer.from(
    user +
      md5(user + pswd + user).toString() +
      (user.length < 10 ? "0" + user.length : user.length)
  ).toString("base64");
}
