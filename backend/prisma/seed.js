import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Users
  console.log('Creating users...');
  const student = await prisma.user.upsert({
    where: { email: 'student@ku.ac.ae' },
    update: {},
    create: {
      email: 'student@ku.ac.ae',
      name: 'Test Student',
      role: 'STUDENT',
      password: hashedPassword,
    },
  });

  const faculty = await prisma.user.upsert({
    where: { email: 'faculty@ku.ac.ae' },
    update: {},
    create: {
      email: 'faculty@ku.ac.ae',
      name: 'Dr. Test Faculty',
      role: 'FACULTY',
      password: hashedPassword,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ku.ac.ae' },
    update: {},
    create: {
      email: 'admin@ku.ac.ae',
      name: 'Admin User',
      role: 'ADMIN',
      password: hashedPassword,
    },
  });

  const maintenance = await prisma.user.upsert({
    where: { email: 'maintenance@ku.ac.ae' },
    update: {},
    create: {
      email: 'maintenance@ku.ac.ae',
      name: 'Maintenance Staff',
      role: 'MAINTENANCE',
      password: hashedPassword,
    },
  });

  console.log('✓ Users created');

  // Create Facilities
  console.log('Creating facilities...');
  const facilities = [
    {
      name: 'Innovation Lab',
      type: 'Lab',
      capacity: 30,
      location: 'Building A, Floor 2',
      description: 'Computer lab with latest equipment',
    },
    {
      name: 'Lecture Hall 101',
      type: 'Classroom',
      capacity: 100,
      location: 'Building B, Floor 1',
      description: 'Large lecture hall with projector',
    },
    {
      name: 'Meeting Room 201',
      type: 'Meeting Room',
      capacity: 15,
      location: 'Building C, Floor 2',
      description: 'Conference room with whiteboard',
    },
    {
      name: 'Basketball Court',
      type: 'Sports',
      capacity: 20,
      location: 'Sports Complex',
      description: 'Indoor basketball court',
    },
    {
      name: 'Research Lab A',
      type: 'Lab',
      capacity: 20,
      location: 'Building D, Floor 3',
      description: 'Research laboratory with specialized equipment',
    },
    {
      name: 'Seminar Room 302',
      type: 'Classroom',
      capacity: 40,
      location: 'Building A, Floor 3',
      description: 'Classroom suitable for seminars and group work',
    },
    {
      name: 'Tennis Court',
      type: 'Sports',
      capacity: 4,
      location: 'Sports Complex',
      description: 'Outdoor tennis court',
    },
    {
      name: 'Library Study Room 1',
      type: 'Meeting Room',
      capacity: 8,
      location: 'Library, Floor 2',
      description: 'Quiet study room for group projects',
    },
  ];

  for (const facility of facilities) {
    await prisma.facility.upsert({
      where: { id: facility.name },
      update: {},
      create: facility,
    });
  }

  console.log('✓ Facilities created');

  // Create Sample Bookings
  console.log('Creating sample bookings...');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(12, 0, 0, 0);

  const innovationLab = await prisma.facility.findFirst({
    where: { name: 'Innovation Lab' },
  });

  if (innovationLab) {
    await prisma.booking.create({
      data: {
        userId: student.id,
        facilityId: innovationLab.id,
        startTime: tomorrow,
        endTime: tomorrowEnd,
        purpose: 'COSC 336 Project Meeting',
        status: 'PENDING',
      },
    });
  }

  console.log('✓ Sample bookings created');

  // Create Sample Event
  console.log('Creating sample events...');
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(14, 0, 0, 0);

  const nextWeekEnd = new Date(nextWeek);
  nextWeekEnd.setHours(16, 0, 0, 0);

  await prisma.event.create({
    data: {
      title: 'Tech Talk: AI in Education',
      description: 'Guest speaker discussing AI applications in education',
      startTime: nextWeek,
      endTime: nextWeekEnd,
      location: 'Lecture Hall 101',
      creatorId: faculty.id,
      status: 'PUBLISHED',
    },
  });

  console.log('✓ Sample events created');

  // Create Sample Maintenance Request
  console.log('Creating sample maintenance requests...');
  const lectureHall = await prisma.facility.findFirst({
    where: { name: 'Lecture Hall 101' },
  });

  if (lectureHall) {
    await prisma.maintenanceRequest.create({
      data: {
        userId: faculty.id,
        facilityId: lectureHall.id,
        description: 'Projector not working properly',
        status: 'PENDING',
      },
    });
  }

  console.log('✓ Sample maintenance requests created');

  console.log('\n✅ Database seeding completed successfully!');
  console.log('\n📧 Test User Credentials:');
  console.log('   Student: student@ku.ac.ae / password123');
  console.log('   Faculty: faculty@ku.ac.ae / password123');
  console.log('   Admin: admin@ku.ac.ae / password123');
  console.log('   Maintenance: maintenance@ku.ac.ae / password123\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
