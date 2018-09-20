import { randomBytes, pbkdf2, pbkdf2Sync } from 'crypto';

type Algorithm =
	| 'sha512'
	| 'RSA-MD4'
	| 'RSA-MD5'
	| 'RSA-MDC2'
	| 'RSA-RIPEMD160'
	| 'RSA-SHA1'
	| 'RSA-SHA1-2'
	| 'RSA-SHA224'
	| 'RSA-SHA256'
	| 'RSA-SHA384'
	| 'RSA-SHA512'
	| 'blake2b512'
	| 'blake2s256'
	| 'md4'
	| 'md4WithRSAEncryption'
	| 'md5'
	| 'md5-sha1'
	| 'md5WithRSAEncryption'
	| 'mdc2'
	| 'mdc2WithRSA'
	| 'ripemd'
	| 'ripemd160'
	| 'ripemd160WithRSA'
	| 'rmd160'
	| 'sha1'
	| 'sha1WithRSAEncryption'
	| 'sha224'
	| 'sha224WithRSAEncryption'
	| 'sha256'
	| 'sha256WithRSAEncryption'
	| 'sha384'
	| 'sha384WithRSAEncryption'
	| 'sha512'
	| 'sha512WithRSAEncryption'
	| 'ssl3-md5'
	| 'ssl3-sha1'
	| 'whirlpool';
interface Config {
	salt?: Buffer;
	keyLength?: number;
	iterations?: number;
	algorithm?: Algorithm;
}
/**
 * Encrypt/decrypt helper for the Node crypto package's pbkdf2 and pbkdf2Sync functions
 * @example
 * const hashedPassword = new Encrypt({}).toHash('password1')
 *
 * const userInput = 'password1'
 *
 * new Encrypt({}).isMatch(userInput, hashedPassword).then(authenticated => authenticated ? loginUser() : redirect())
 */
export default class Encrypt {
	private salt: Buffer;
	private iterations: number;
	private keyLength: number;
	private algorithm: 'sha512' | string;

	constructor({ salt, keyLength, iterations, algorithm }: Config) {
		this.keyLength = keyLength || 16;
		this.salt = salt || randomBytes(this.keyLength);
		this.iterations = iterations || 1000;
		this.algorithm = algorithm || 'sha512';
	}

	private createHash(
		password: string,
		salt: Buffer = this.salt,
	): Promise<string> {
		return new Promise((resolve, reject) =>
			pbkdf2(
				password,
				salt,
				this.iterations,
				this.keyLength,
				this.algorithm,
				(error, derivedKey) => {
					if (error) reject(error);
					const saltString = salt.toString('hex');
					const derivedKeyString = derivedKey.toString('hex');
					const derivedKeyWithSaltPrefix = `${saltString}:${derivedKeyString}`;

					resolve(derivedKeyWithSaltPrefix);
				},
			),
		);
	}
	private createHashSync(password: string, salt: Buffer = this.salt): string {
		const saltString = salt.toString('hex');
		const hashedPasswordBuffer = pbkdf2Sync(
			password,
			salt,
			this.iterations,
			this.keyLength,
			this.algorithm,
		);

		const hashedPasswordString = Buffer.from(hashedPasswordBuffer).toString(
			'hex',
		);
		const hashedPasswordWithSaltPrefix = `${saltString}:${hashedPasswordString}`;

		return hashedPasswordWithSaltPrefix;
	}

	private getSalt(hashedPasswordWithSaltPrefix: string): Buffer {
		const salt = hashedPasswordWithSaltPrefix.split(':')[0];
		const saltBuffer = Buffer.from(salt, 'hex');

		return saltBuffer;
	}

	/**
	 * Asynchronously creates a new password hash as a HEX string
	 * @param password UTF-8 string to hash
	 */
	public toHash(password: string): Promise<string> {
		return this.createHash(password);
	}

	/**
	 * Asynchronously checks that a previously hashed HEX string from this class matches the raw UTF-8 version
	 * @param password UTF-8 string to check against the hash
	 * @param previouslyHashedPassword previously-hashed HEX string to check against the new UTF-8 string password
	 */
	public async isMatch(
		password: string,
		previouslyHashedPassword: string,
	): Promise<boolean> {
		const salt = this.getSalt(previouslyHashedPassword);
		const newlyHashedPassword = await this.createHash(password, salt);

		return newlyHashedPassword === previouslyHashedPassword ? true : false;
	}

	/**
	 * Synchronously creates a new password hash as a HEX string
	 * @param password UTF-8 string to hash
	 */
	public toHashSync(password: string): string {
		return this.createHashSync(password);
	}

	/**
	 * Synchronously checks that a previously hashed HEX string from this class matches the raw UTF-8 version
	 * @param password UTF-8 string to check against the hash
	 * @param previouslyHashedPassword previously-hashed HEX string to check against the new UTF-8 string password
	 */
	public isMatchSync(
		password: string,
		previouslyHashedPassword: string,
	): boolean {
		const salt = this.getSalt(previouslyHashedPassword);
		const newlyHashedPassword = this.createHashSync(password, salt);

		return newlyHashedPassword === previouslyHashedPassword ? true : false;
	}
}
