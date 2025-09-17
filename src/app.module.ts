import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer.module';

@Module({
  imports: [
    CustomerModule,
    MongooseModule.forRoot(
      'mongodb+srv://rhadijadreige:admin123@cluster0.gynahsy.mongodb.net/customer?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 75000,
        connectTimeoutMS: 50000,
        maxPoolSize: 10,
        minPoolSize: 2,
        maxIdleTimeMS: 30000,
        retryWrites: true,
        retryReads: true,
        heartbeatFrequencyMS: 10000,
      }
    ),
  ],
})
export class AppModule { }
