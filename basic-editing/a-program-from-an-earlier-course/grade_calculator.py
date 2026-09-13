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
