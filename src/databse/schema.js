import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'surveys',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'teacher_id', type: 'string'},
        {name: 'teacher_name', type: 'string'},
        {name: 'answers_json', type: 'string'},
        {name: 'latitude', type: 'number'},
        {name: 'longitude', type: 'number'},
        {name: 'district', type: 'string'},
        {name: 'block', type: 'string'},
        {name: 'cluster', type: 'string'},
        {name: 'image_uri', type: 'string'},
      ],
    }),
  ],
});
