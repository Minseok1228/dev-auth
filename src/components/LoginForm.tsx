'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast, useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { formSchema } from '@/app/_validators/formSchema';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

type FormInput = z.infer<typeof formSchema>;
type handleStateChage = {
  handleStateChage: () => void;
};
export function LoginForm({ handleStateChage }: handleStateChage) {
  const { toast } = useToast();
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: FormInput) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const [success, setSuccess] = useState([]);
  //이메일,연락처 중복확인
  const login = async () => {
    const email = form.watch().email;
    const password = form.watch().password;

    const res = await fetch(`/api`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    const user = data[0];
    toast({
      title: '로그인 성공',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{user.name + '님 어서오세요'}</code>
        </pre>
      ),
    });
  };
  // const loginUser = { params: { email, password } };
  // const { data } = await axios.get('http://localhost:8000/auth', loginUser);
  // console.log(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Card className="w-[400px] ">
          <CardHeader>
            <CardTitle className="flex justify-center">로그인</CardTitle>
            <CardDescription className="flex justify-center">email과 비밀번호를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 space-y-2 ">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@world.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="비밀번호를 입력해주세요." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <div className="flex justify-end">
                  <Button type="submit" onClick={login}>
                    로그인하기
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="flex justify-end p-1 items-center">
          아직 회원이 아니신가요?
          <Button onClick={handleStateChage} variant={'ghost'} className="text-lg">
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
