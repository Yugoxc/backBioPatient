import { CosmosDateTime, CosmosPartitionKey } from "@nestjs/azure-database";

@CosmosPartitionKey('id')
export class Patient {
    id:string;
    
    name: string;
    lastname: string;
    email: string;

    description: string;

    orderDate: Date;

}
