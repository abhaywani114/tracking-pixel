import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EmailTracking } from './email-tracking.entity';

@Entity()
export class OpenLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EmailTracking, (tracking) => tracking.opens, {
    onDelete: 'CASCADE',
  })
  tracking: EmailTracking;

  @Column()
  ip: string;

  @Column()
  userAgent: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  forwarded: boolean;

  @Column({ nullable: true })
  forwardedEmail: string;

  @CreateDateColumn()
  openedAt: Date;
  constructor(Partial: Partial<OpenLog>) {
    Object.assign(this, Partial);
  }
}
