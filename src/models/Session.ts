import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import Movie from './Movie';
import Room from './Room';

@Entity('sessions')
class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp with time zone')
    showtime: Date;

    @Column()
    room_id: string;

    @Column()
    movie_id: string;

    @OneToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @ManyToOne(() => Movie)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Session;