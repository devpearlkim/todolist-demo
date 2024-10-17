const express = require('express');
const taskController = require('../controller/task.controller');
const router = express.Router();

// Task 생성
router.post('/', taskController.createTask);

// 모든 Task 조회
router.get('/', taskController.getTask);

// 특정 Task 업데이트
router.put('/:id', taskController.updateTask);

// 특정 Task 삭제
router.delete('/:id', taskController.deleteTask);

module.exports = router;
