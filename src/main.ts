import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log({
  dbName: process.env.AZURE_COSMOS_DB_NAME,
  endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT,
  key: process.env.AZURE_COSMOS_DB_KEY,
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
