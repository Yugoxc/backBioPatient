import { Controller, Get, Post, Body, Patch, Param, Delete, UnprocessableEntityException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectModel } from '@nestjs/azure-database';
import { Container } from '@azure/cosmos';

@Controller('patients')
export class PatientsController {

  constructor(@InjectModel(Patient)
  private readonly patientContainer:Container) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    var newOrder = new Patient();

    newOrder.name = createPatientDto.name
    newOrder.lastname = createPatientDto.lastname
    newOrder.email = createPatientDto.email
    newOrder.orderDate = createPatientDto.orderDate

    var {resource} = await this.patientContainer.items.create(newOrder)

    return resource
  
  }

  @Get()
  async findAll() {
    var sqlQuery = "select * from c"

    var cosmosResutls = await this.patientContainer.items.query<Patient>(sqlQuery).fetchAll();

    return cosmosResutls.resources;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const querySpec = {
          query: "SELECT * FROM c WHERE c.id=@id",
          parameters: [
            {
              name: "@id",
              value: id
            }
          ]
        };
       const { resources } = await this.patientContainer.items.query<Patient>(querySpec).fetchAll()
        return resources
   } catch (error) {
     // Entity not found
     throw new UnprocessableEntityException(error);
   }
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
  //   try {
  //     const { resource: item } = await this.patientContainer.item<Patient>(id, 'type').read()

  //     // Disclaimer: Assign only the properties you are expecting!
  //     Object.assign(item, updatePatientDto);

  //     const { resource: replaced } = await this.patientContainer
  //      .item(id, 'type')
  //      .replace<Event>(item)
  //     return replaced
  //   } catch (error) {
  //     throw new UnprocessableEntityException(error);
  //   }
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patientContainer.item(id,id).delete()

    return "deleted"
  }
}
