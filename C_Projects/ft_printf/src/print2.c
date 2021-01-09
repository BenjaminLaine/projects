/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print2.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/29 15:33:12 by blaine            #+#    #+#             */
/*   Updated: 2020/01/30 22:37:17 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	print_u(t_stf *stf)
{
	unsigned long long	num;
	char				*str;

	if (stf->convert[0] == 'h' && stf->convert[1] == 'h')
		num = (unsigned char)(va_arg(stf->args, unsigned int));
	else if (stf->convert[0] == 'h' && stf->convert[1] == '\0')
		num = (unsigned short)(va_arg(stf->args, unsigned int));
	else if (stf->convert[0] == 'l' && stf->convert[1] == 'l')
		num = (unsigned long long)(va_arg(stf->args, unsigned long long));
	else if (stf->convert[0] == 'l')
		num = (unsigned long)(va_arg(stf->args, unsigned long));
	else
		num = (unsigned int)(va_arg(stf->args, unsigned int));
	str = ft_itoa(num);
	ft_get_pres(stf, &str, ft_num_count(num));
	if (stf->width > (int)ft_strlen(str))
		ft_str_space(stf, &str);
	stf->printed += ft_strlen(str);
	ft_putstr(str);
	stf->idx++;
	ft_strdel(&str);
}

void	print_o(t_stf *stf)
{
	unsigned long	num;
	char			*str;

	if (stf->convert[0] == 'h' && stf->convert[1] == 'h')
		num = (unsigned char)(va_arg(stf->args, unsigned int));
	else if (stf->convert[0] == 'h' && stf->convert[1] == '\0')
		num = (unsigned short)(va_arg(stf->args, unsigned int));
	else if (stf->convert[0] == 'l' && stf->convert[1] == 'l')
		num = (unsigned long long)(va_arg(stf->args, unsigned long long));
	else if (stf->convert[0] == 'l')
		num = (unsigned long)(va_arg(stf->args, unsigned long));
	else
		num = (unsigned int)(va_arg(stf->args, long));
	str = ft_itoa_base(num, 8, 0);
	ft_inc_hash(stf, &str, num);
	ft_get_pres(stf, &str, ft_strlen(str));
	if (stf->width > (int)ft_strlen(str))
		ft_str_space(stf, &str);
	stf->printed += ft_strlen(str);
	ft_putstr(str);
	stf->idx++;
	ft_strdel(&str);
}

void	print_s(t_stf *stf)
{
	char	*str1;
	char	*str2;
	int		i;

	str1 = (va_arg(stf->args, char*));
	stf->idx++;
	if (str1 == NULL)
		str1 = ft_strdup("(null)");
	else
		str1 = ft_strjoin(str1, "\0");
	i = ft_strlen(str1);
	if (stf->pres != -1)
	{
		str2 = ft_strndup(str1, stf->pres);
		ft_strdel(&str1);
		str1 = str2;
		i = ft_strlen(str1);
	}
	if (stf->width > i)
		ft_str_space(stf, &str1);
	stf->printed += ft_strlen(str1);
	ft_putstr(str1);
	ft_strdel(&str1);
}

void	print_f(t_stf *stf)
{
	long double	num;
	char		*str;
	char		*tmp;

	if (stf->convert[0] == 'L')
		num = (long double)(va_arg(stf->args, long double));
	else
		num = (double)va_arg(stf->args, double);
	str = ft_ftoa(num, stf->pres);
	if (stf->flags[0] == '#' && stf->pres == 0)
	{
		tmp = ft_strjoin(str, ".");
		ft_strdel(&str);
		str = tmp;
	}
	ft_f_flags(stf, &str, num);
	ft_f_space(stf, &str, num, ft_f_count(num));
	ft_putstr(str);
	stf->printed += ft_strlen(str);
	stf->idx++;
	ft_strdel(&str);
}
