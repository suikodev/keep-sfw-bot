import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
} from "typeorm";

@Entity()
export class ClassifiedFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ unique: true })
  fileUniqueId: string;

  @Column("float")
  drawing: number;

  @Column("float")
  hentai: number;

  @Column("float")
  neutral: number;

  @Column("float")
  porn: number;

  @Column("float")
  sexy: number;
}
