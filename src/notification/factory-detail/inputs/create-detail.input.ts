import { Report } from "src/reports/models/report"
import { User } from "src/users/models/user"

export class CreateDetailInput {
    constructor(
        private report: Report,
        private user: User
    ) {}

    getFirstNameUser(): string {
        return this.user.firstName
    }

    getLastNameUser(): string {
        return this.user.lastName
    }

    getTitleReport(): string {
        return this.report.title
    }
}