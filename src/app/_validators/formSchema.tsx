import { z } from 'zod';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const phoneRegex = /^010\d{8}$/;

export const formSchema = z
  .object({
    email: z.string().email({ message: '올바른 이메일을 입력해주세요.' }),
    phone: z
      .string()
      .min(11, '연락처는 11자리여야 합니다.')
      .max(11, '연락처는 11자리여야 합니다.')
      .refine((value) => phoneRegex.test(value), '010으로 시작하는 11자리 숫자를 입력해주세요'),
    name: z
      .string()
      .min(2, { message: '이름은 2글자 이상이어야 합니다.' })
      .max(10, { message: '이름은 10글자 이하이어야 합니다.' }),
    role: z.string().min(2, { message: '역할을 선택해주세요.' }),
    password: z
      .string()
      .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
      .max(12, '비밀번호는 12자리 이하이어야 합니다.')
      .refine(
        (value) => passwordRegex.test(value),
        '비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.'
      ),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'], // 에러 메시지를 표시할 필드 지정
  });
//   confirmPassword: z
//     .string()
//     .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
//     .max(12, '비밀번호는 12자리 이하이어야 합니다.')
//     .refine((value, ctx) => value === ctx.parent.password, '비밀번호가 일치하지 않습니다.'),
// });

// confirmPassword: z.string().refine({
//   check: (value: string, ctx: any) => {
//     const password = ctx.parent.password;
//     return value === password;
//   },
//   message: '비밀번호가 일치하지 않습니다.',
// }),
// .refine((data) => data.password === data.confirmPassword, {
//   message: '비밀번호가 일치하지 않습니다.',
// });
