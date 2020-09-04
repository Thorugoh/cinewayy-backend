import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('rooms')
class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  seats: number;
}

export default Room;
