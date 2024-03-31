export class Meetup {
  id!: number; // Добавляем поле id
  name: string;
  description: string;
  time: Date;
  duration: number;
  location: string;
  target_audience: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;

  constructor(
    name: string,
    description: string,
    time: Date,
    duration: number,
    location: string,
    target_audience: string,
    need_to_know: string,
    will_happen: string,
    reason_to_come: string
  ) {
    this.name = name;
    this.description = description;
    this.time = time;
    this.duration = duration;
    this.location = location;
    this.target_audience = target_audience;
    this.need_to_know = need_to_know;
    this.will_happen = will_happen;
    this.reason_to_come = reason_to_come;
  }
}
