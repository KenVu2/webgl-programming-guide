def calculate_average(scores):
    total = sum(scores)
    return total / len(scores)


def letter_grade(average):
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
    scores = [85, 92, 78, 90, 88]
    avg = calculate_average(scores)
    grade = letter_grade(avg)

    print(f"Scores: {scores}")
    print(f"Average: {avg:.2f}")
    print(f"Letter Grade: {grade}")


if __name__ == "__main__":
    main()
