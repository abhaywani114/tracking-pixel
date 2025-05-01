import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OpenLog } from './open-log.entity';

@Entity()
export class EmailTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  trackingHash: string;

  @Column()
  originalEmail: string;

  @Column({ nullable: true })
  campaign: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OpenLog, (openLog) => openLog.tracking, { cascade: true })
  opens: OpenLog[];
}
