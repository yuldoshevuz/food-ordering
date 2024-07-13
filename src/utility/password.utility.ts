import bcrypt from "bcrypt"

class PasswordUtility {
    public async generateSalt(): Promise<string> {
        return await bcrypt.genSalt()
    }

    public async generatePassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    public async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}

export default new PasswordUtility()