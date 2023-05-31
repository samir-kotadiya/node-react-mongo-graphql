'use strict'
import mongoose from 'mongoose';
import conf from '../config';

const db = mongoose.createConnection(conf.get('mongodb'), {  });

export default db;