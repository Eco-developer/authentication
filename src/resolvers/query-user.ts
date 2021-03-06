import { 
    Context,
    GraphqlResolversTypes
} from "../interfaces";

export const user = async (parent: any, args: GraphqlResolversTypes.QueryUserArgs, context: Context) => {
    try {
        const {
            models : {
                User,
            },
        } = context;
        

        const {
            user_id
        } = args;
        const userIndb = await User.findOne({user_id});
        if (!userIndb) {
            throw new Error("There is not a user with this user_id in the database");
        }
        return userIndb.toObject()
    } catch (error:any) {
        throw new Error(error.message);
    }
}