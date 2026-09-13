def compute_avg(student_scores):
    sum_total = sum(student_scores)
    return sum_total / len(student_scores)


def get_letter_grade(average):
    if average >= 90:
        return "A"
    elif average >= 80:
        return "B"
    elif average >= 70:
        return "C"
    elif average >= 60:
        return "D"
    else:
        return "F"


def main():
    student_scores = [85, 92, 78, 90, 88]
    avg_score = compute_avg(student_scores)
    grade = get_letter_grade(avg_score)

    print(f"Student scores: {student_scores}")
    print(f"Average: {avg_score:.2f}")
    print(f"Letter Grade: {grade}")


if __name__ == "__main__":
    main()

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def get_average(self):
        return sum(self.grades) / len(self.grades)

    def get_name(self):
        return self.name
    def process_students():
        student1 = Student("Alice", 1001)
        student1.add_grade(90)
        student1.add_grade(85)
        student1.name = "Alice Smith"
        print(student1.get_average())

        student2 = Student("Bob", 1002)
        student2.add_grade(70)
        student2.add_grade(75)
        student2.student_id = 1003
        print(student2.get_name())

        student3 = Student("Carla", 1004)
        student3.add_grade(100)
        rint(student3.get_average())
    