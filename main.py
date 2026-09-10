import random


def multiply_by_11(number):
    tens = number // 10
    ones = number % 10
    middle = tens + ones

    if middle < 10:
        return tens * 100 + middle * 10 + ones
    else:
        return (tens + 1) * 100 + (middle - 10) * 10 + ones


print("=== VEDIC MATHS APP ===")
print("1. Learn: Multiply by 11")
print("2. Practice")
print("3. Exit")

choice = input("Choose an option: ")

if choice == "1":
    print("\nTRICK: To multiply a 2-digit number by 11,")
    print("add the two digits and place the sum between them.")
    print("\nExample:")
    print("23 × 11 → 2 (2+3) 3 → 253")

elif choice == "2":
    score = 0
    total_questions = 5

    print("\n=== PRACTICE ===")

    for question in range(total_questions):
        number = random.randint(10, 99)
        correct_answer = multiply_by_11(number)

        print(f"\nQuestion {question + 1}:")
        user_answer = int(input(f"{number} × 11 = "))

        if user_answer == correct_answer:
            print("✅ Correct!")
            score += 1
        else:
            print(f"❌ Wrong! The answer is {correct_answer}")

    print("\n=== RESULTS ===")
    print(f"Score: {score}/{total_questions}")

elif choice == "3":
    print("Goodbye!")

else:
    print("Invalid choice.")