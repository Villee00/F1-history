import { gql } from "apollo-server";
import Driver from "../../models/driver.js";
import * as yup from 'yup'


export const typeDefs = gql`
  type Drivers{
    drivers: [Driver!]!
    driverCount: Int!
  }
  extend type Query {
    getDrivers(limit: Int, offset: Int, name: String, season: Int): Drivers!
    getDriver(driverID: String!): Driver!
    getDriverCount: Int!
    getDriverFilters: DriverFilter!
  }
`;

const argsSchema = yup.object({
  limit: yup.number().default(10), 
  offset: yup.number(), 
  name: yup.string(), 
  season: yup.number()
})
 
export const resolvers = {
  Query: {
    getDrivers: async (obj, args, context, info) => {
      const normalizedArgs = await argsSchema.validate(args);
      const {
        limit, 
        offset, 
        name, 
        season
      } = normalizedArgs;

      let query;
      let driverCount;
      if(name){
        const search = new RegExp(name, 'i');
        query = Driver.find({$or:[{"lastName": search}, {"firstName": search}]});
        driverCount = await Driver.countDocuments({$or:[{"lastName": search}, {"firstName": search}]})
      }
      else{
        query = Driver.find({})
        driverCount = await Driver.countDocuments({})

      }

      const drivers = await query
        .sort({ dateOfBirth: -1 })
        .limit(args.limit)
        .skip(args.offset)
        .exec()
        
      console.log(drivers)
      return {drivers: drivers, driverCount}
    },
    getDriver: async (obj, args, context, info) => {
      return await Driver.findById(args.driverID).populate({
        path: "races.race",
        model: "Race",
      })
    },
    getDriverCount: async (obj, args, context, info) => {
      return await Driver.find({}).countDocuments();
    },
    getDriverFilters: ()=>{
      return {teams: []}
    }
  },
};

export default {
  typeDefs,
  resolvers,
};
