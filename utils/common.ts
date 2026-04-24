import { AddQuestionform } from "@/types/common";



export const validateField = (name: keyof AddQuestionform, value: string) => {

    switch (name) {
        case 'question':
            if (!value) return 'Question is mandatory'
            return '';

        case 'answer':
            if (!value) return 'Please give the answer for your question'

    }
};