Lab Phase 7
Test Cases
1
INTRODUCTION TO SOFTWARE ENGINEERING LAB
What is Software Testing?
2
Software testing is the systematic process of evaluating and verifying a
software application to ensure that it meets specified requirements and
functions correctly under various conditions.
A test case is a detailed set of conditions, inputs, actions, and expected
outcomes designed to verify the functionality, performance, or other
aspects of a software.
3
Quality Assurance encompasses Testing
Usability Testing
Quality Assurance
Testing
Prototype
Testing
Scenario
Testing
Product
Testing
Fault Avoidance Fault Detection Fault Tolerance
Debugging
Unit
Testing
Integration
Testing
System
Testing
Verification Configuration
Management
Atomic
Transactions
Modular
Redundancy
Correctness
Debugging
Performance
Debugging
Reviews
Walkthrough Inspection
Acceptance
Testing
4
Types of Testing (1/2)
• Unit Testing:
• Individual subsystem
• Carried out by developers
• Goal: Confirm that subsystems is correctly coded and
carries out the intended functionality
• Integration Testing:
• Groups of subsystems and eventually the entire system
• Carried out by developers
• Goal: Test the interface among the subsystem
5
Types of Testing (2/2)
• System Testing:
• Test the entire system
• Carried out by developers
• Goal: Determine if the system meets all the requirements
• Acceptance Testing:
• Evaluates the system delivered by developers
• Carried out by the client
• Goal: Demonstrate that the system meets customer
requirements and is ready to use
6
Unit Testing
Static Analysis:
Hand execution: Reading the source code
Code Inspection (formal presentation)
Dynamic Analysis:
Black-box testing (Test the input/output behavior)
White-box testing (Test the internal logic of the subsystem)
7
Black-box Testing
• Focus: I/O behavior
• If for any given input, we can predict the output, then the module passes
the test
• Goal: Reduce number of test cases by equivalence partitioning:
• Choose test cases for each equivalence class. (Example: If an object is
supposed to accept a negative number, testing one negative number
is enough)
• Example
❑ If x = 3 then …
❑ If x > -5 and x < 5 then …
White-box Testing
• Focus: Thoroughness (Coverage)
• Every statement in the component is executed at least once
• Types of white-box testing
• Statement Testing
• Loop Testing
• Path Testing
• Branch Testing
9
What to do
Develop the test cases by:
1- Writing the test objective
2- Writing the test strategies
3- Create the test oracle
An oracle contains:
a) Input
b) Expected results
c) Actual results
d) Pass/Fail
Thank You
10


Dear Students,

Since I received many questions regarding Phase 7 and 8, please note the following:

Phase 7 — Testing Document
You are required to submit a testing document that includes:

Objectives of the testing

Testing strategies

Test cases and test oracles

Example of a Testing Objective:

To verify that the login module correctly authenticates users with valid credentials and rejects invalid login attempts.

Example Test Case (Login):

Test Case	Login with valid credentials
Test Oracle	The system should allow access only when the username and password are correct.
Input	Username: student01
 	Password: password123
Expected Output	User is redirected to the dashboard page.
Actual Output	(Student fills after testing)
Status	Pass / Fail
You can either create a separate table like this for each test case or combine all test cases into one large table with columns for input, expected output, actual results, etc.—the format is flexible as long as all required details are clearly included.
Phase 8 — System Submission
You must submit:

Your full code in a .zip file

A document with screenshots of the main pages of your system working

Add a brief one-line description under each screenshot.

Good luck, and regards

Nouf