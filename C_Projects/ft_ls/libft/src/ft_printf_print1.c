/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print1.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.hive.fi>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/29 15:31:39 by blaine            #+#    #+#             */
/*   Updated: 2020/03/18 00:37:41 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	print_d(t_stf *stf)
{
	long long	num;
	char		*str;

	if (stf->convert[0] == 'h' && stf->convert[1] == 'h')
		num = (signed char)(va_arg(stf->args, int));
	else if (stf->convert[0] == 'h' && stf->convert[1] == '\0')
		num = (short int)(va_arg(stf->args, int));
	else if (stf->convert[0] == 'l' && stf->convert[1] == 'l')
		num = (va_arg(stf->args, long long));
	else if (stf->convert[0] == 'l')
		num = (va_arg(stf->args, long));
	else
		num = (va_arg(stf->args, int));
	str = ft_itoa(num);
	if (num == 0 && stf->pres == 0)
		str[0] = '\0';
	ft_put_flags(stf, &str, ft_num_count(num), num);
	ft_add_space(stf, &str, num, ft_num_count(num));
	ft_putstr(str);
	stf->printed += ft_strlen(str);
	stf->idx++;
	ft_strdel(&str);
}

void	print_c(t_stf *stf)
{
	char *str;
	char c;

	stf->flags[3] = '\0';
	str = ft_strnew(1);
	c = (va_arg(stf->args, int));
	str[0] = c;
	if (stf->width > 1)
	{
		(c == '\0') ? stf->width-- : 1;
		ft_str_space(stf, &str);
		if (stf->flags[2] != '-')
			ft_putstr(str);
		else
			ft_putstr(str);
		(c == '\0') ? stf->width++ : 1;
		stf->printed += stf->width;
	}
	else
	{
		ft_putchar(c);
		stf->printed += 1;
	}
	stf->idx++;
	ft_strdel(&str);
}

void	print_p(t_stf *stf)
{
	unsigned long	p;
	char			*str;
	char			*tmp;

	p = va_arg(stf->args, unsigned long int);
	tmp = ft_itoa_base(p, 16, 0);
	if (stf->pres == 0 && p == 0)
		str = ft_strdup("0x");
	else
		str = ft_strjoin("0x", tmp);
	ft_strdel(&tmp);
	if (stf->width > (int)ft_strlen(str))
	{
		stf->flags[3] = '\0';
		ft_str_space(stf, &str);
	}
	ft_putstr(str);
	stf->printed += ft_strlen(str);
	stf->idx++;
	ft_strdel(&str);
}

void	print_pr(t_stf *stf)
{
	char *str;
	char *tmp;

	tmp = NULL;
	str = ft_strnew(1);
	str[0] = '%';
	if (stf->width >= 1 && stf->width >= stf->pres)
	{
		tmp = ft_strnew(stf->width - 1);
		ft_memset(tmp, ' ', stf->width - 1);
	}
	if (stf->width - 1 >= 1)
	{
		ft_strdel(&str);
		str = (stf->flags[2] == '-') ?
		ft_strjoin("%", tmp) : ft_strjoin(tmp, "%");
	}
	ft_putstr(str);
	stf->idx++;
	stf->printed += ft_strlen(str);
	ft_strdel(&str);
	if (tmp != NULL)
		ft_strdel(&tmp);
}

void	print_x(t_stf *stf)
{
	unsigned long long	num;
	char				*str;

	if (stf->convert[0] == 'h' && stf->convert[1] == 'h')
		num = (unsigned char)(va_arg(stf->args, int));
	else if (stf->convert[0] == 'h' && stf->convert[1] == '\0')
		num = (unsigned short)(va_arg(stf->args, int));
	else if (stf->convert[0] == 'l' && stf->convert[1] == 'l')
		num = (va_arg(stf->args, unsigned long long));
	else if (stf->convert[0] == 'l')
		num = (va_arg(stf->args, unsigned long));
	else
		num = (va_arg(stf->args, unsigned int));
	str = ft_itoa_base(num, 16, (stf->str[stf->idx] == 'X'));
	ft_inc_hash(stf, &str, num);
	if (str != NULL)
	{
		ft_get_pres(stf, &str, ft_strlen(str));
		if (stf->width > (int)ft_strlen(str))
			ft_str_space(stf, &str);
		stf->printed += ft_strlen(str);
	}
	ft_putstr(str);
	stf->idx++;
	ft_strdel(&str);
}
