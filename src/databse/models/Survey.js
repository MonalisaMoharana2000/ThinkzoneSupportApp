import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Survey extends Model {
  static table = 'surveys';

  @field('name') name;
  @field('status') status;
  @field('teacher_id') teacherId;
  @field('teacher_name') teacherName;
  @field('answers_json') answersJson;
  @field('latitude') latitude;
  @field('longitude') longitude;
  @field('district') district;
  @field('block') block;
  @field('cluster') cluster;
  @field('image_uri') imageUri;
}
