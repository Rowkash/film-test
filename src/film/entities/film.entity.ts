import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn
} from 'typeorm'

@Entity('film')
export class Film {
	@PrimaryGeneratedColumn({ name: 'film_id' })
	filmId: number

	@Column({ name: 'title', type: 'varchar', length: 255 })
	title: string

	@Column({ name: 'description', type: 'text', nullable: true })
	description?: string

	@Column({ name: 'release_year', type: 'int', nullable: true })
	releaseYear?: number

	@Column({ name: 'language_id', type: 'smallint' })
	languageId: number

	@Column({ name: 'rental_duration', type: 'smallint', default: 3 })
	rentalDuration: number

	@Column({
		name: 'rental_rate',
		type: 'numeric',
		precision: 4,
		scale: 2,
		default: 4.99
	})
	rentalRate: number

	@Column({ name: 'length', type: 'smallint', nullable: true })
	length?: number

	@Column({
		name: 'replacement_cost',
		type: 'numeric',
		precision: 5,
		scale: 2,
		default: 19.99
	})
	replacementCost: number

	@Column({
		name: 'rating',
		type: 'enum',
		enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
		default: 'G'
	})
	rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'

	@CreateDateColumn({
		name: 'last_update',
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP'
	})
	lastUpdate: Date

	@Column({
		name: 'special_features',
		type: 'text',
		array: true,
		nullable: true
	})
	specialFeatures?: string[]

	@Column({ name: 'fulltext', type: 'tsvector' })
	fulltext: any
}
