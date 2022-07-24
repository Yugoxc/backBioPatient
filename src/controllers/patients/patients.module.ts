import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Patient } from './entities/patient.entity';

@Module({
  imports:[
    AzureCosmosDbModule.forFeature([{
      collection:'patientOrders',
      dto: Patient
    }])
  ],
  controllers: [PatientsController],
  providers: [PatientsService]
})
export class PatientsModule {}
