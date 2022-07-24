import { CosmosPartitionKey } from "@nestjs/azure-database";
import { Patient } from '../../patients/entities/patient.entity';

@CosmosPartitionKey('id')
export class Order {
    id: number;

    orderDate: Date;
    
    patient: Patient
}
