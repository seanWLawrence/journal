import { randomBytes, pbkdf2Sync } from 'crypto';

class Password {
	private iv: Buffer;
	private rawPassword: Buffer;
	private hashedPassword: string;
	constructor(rawPassword: string) {
		/**
		 * Create random internalized vector to randomize the hash
		 */
		this.iv = randomBytes(16);
		/**
		 * Raw password Buffer created for the setter method
		 */
		this.rawPassword = Buffer.from(rawPassword);
		/**
		 * Hashed password generated from the raw password and iv
		 */
		this.hashedPassword = this.generateHash(rawPassword);
	}

	/**
	 * Generate a hash using the random internalized vector value,
	 * user inputted password and crypto algorithm
	 */
	private generateHash(password: string) {
		return pbkdf2Sync(password, this.iv, 1, 16, 'sha512').toString('hex');
	}

	/**
	 * Checks the original generated hash against the supplied hash
	 * for a strict match
	 */
	public isMatch(testPassword: string) {
		return this.hashedPassword === this.generateHash(testPassword)
			? true
			: false;
	}
}

const test = new Password('password');

console.log('Hash: ', test.isMatch('password'));
