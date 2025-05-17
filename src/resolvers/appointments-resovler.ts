import { Query, Resolver } from "type-graphql";
import 'reflect-metadata';

@Resolver()
export class AppointmentsResolver {
    @Query(() => String)
    async helloWorld() {
        return 'hello world'
    }
}