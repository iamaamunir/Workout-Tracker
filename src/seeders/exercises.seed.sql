-- TRUNCATE TABLE "exercise";

INSERT INTO "exercise" (
  id, name, description, category, difficulty, duration,
  calorie_burned, media_url, "createdAt", "updatedAt"
) VALUES
(uuid_generate_v4(), 'Push-Up', 'Targets the chest, shoulders, and triceps using body weight.', 'Strength', 'Beginner', 30, 8, 'https://cdn.fitnessapp.com/media/pushup.mp4', NOW(), NOW()),
(uuid_generate_v4(), 'Jumping Jacks', 'Full-body cardio warm-up that improves circulation and endurance.', 'Cardio', 'Beginner', 45, 10, 'https://cdn.fitnessapp.com/media/jumping-jacks.mp4', NOW(), NOW()),
(uuid_generate_v4(), 'Plank', 'Improves core stability and posture through static endurance.', 'Core', 'Intermediate', 60, 12, 'https://cdn.fitnessapp.com/media/plank.mp4', NOW(), NOW()),
(uuid_generate_v4(), 'Burpees', 'Combines a squat, jump, and push-up to increase strength and cardio.', 'Cardio', 'Advanced', 40, 15, 'https://cdn.fitnessapp.com/media/burpees.mp4', NOW(), NOW()),
(uuid_generate_v4(), 'Mountain Climbers', 'High-intensity core and cardio workout that raises heart rate fast.', 'Cardio', 'Intermediate', 30, 14, 'https://cdn.fitnessapp.com/media/mountain-climbers.mp4', NOW(), NOW()),
(uuid_generate_v4(), 'Bodyweight Squats', 'Builds lower body strength using just body weight.', 'Strength', 'Beginner', 60, 10, 'https://cdn.fitnessapp.com/media/squats.mp4', NOW(), NOW()),
(uuid_generate_v4(), 'Lunges', 'Strengthens glutes, hamstrings, and improves balance.', 'Strength', 'Intermediate', 45, 11, 'https://cdn.fitnessapp.com/media/lunges.mp4', NOW(), NOW()),
(uuid_generate_v4(), 'Bicycle Crunches', 'Targets obliques and abs with controlled twisting motions.', 'Core', 'Intermediate', 60, 13, 'https://cdn.fitnessapp.com/media/bicycle-crunches.mp4', NOW(), NOW()),
(uuid_generate_v4(), 'High Knees', 'Fast-paced movement that increases lower-body endurance.', 'Cardio', 'Beginner', 30, 9, 'https://cdn.fitnessapp.com/media/high-knees.mp4', NOW(), NOW()),
(uuid_generate_v4(), 'Russian Twists', 'Core exercise that targets the obliques and helps with torso rotation.', 'Core', 'Advanced', 45, 10, 'https://cdn.fitnessapp.com/media/russian-twists.mp4', NOW(), NOW());