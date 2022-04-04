import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SectionsModule } from './sections/sections.module';
import { SubjectsModule } from './subjects/subjects.module';
import { StudentsModule } from './students/students.module';
import { EntriesModule } from './entries/entries.module';
import { AttendanceModule } from './attendance/attendance.module';

import { Section } from './sections/entities/section.entity';
import { Subject } from './subjects/entities/subject.entity';
import { Student } from './students/entities/student.entity';
import { Entry } from './entries/entities/entry.entity';
import { Attendance } from './attendance/entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'the password',
      database: 'anecdotic-registry',
      entities: [
        Section,
        Subject,
        Student,
        Entry,
        Attendance,
      ],
      synchronize: true,
    }),
    SectionsModule,
    SubjectsModule,
    StudentsModule,
    EntriesModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
}
