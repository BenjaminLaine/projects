/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   flaghandle2.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/12/13 19:26:07 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 17:49:56 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_converts(t_stf *stf)
{
	if (stf->str[stf->idx] == 'h')
		(stf->str[stf->idx + 1] == 'h') ? ft_memset(stf->convert, 'h', 2)
		: ft_memset(stf->convert, 'h', 1);
	if (stf->str[stf->idx] == 'l')
		(stf->str[stf->idx + 1] == 'l') ? ft_memset(stf->convert, 'l', 2)
		: ft_memset(stf->convert, 'l', 1);
	if (stf->str[stf->idx] == 'L')
		ft_memset(stf->convert, 'L', 1);
}

void	ft_dot(t_stf *stf)
{
	if (!(ft_isdigit(stf->str[stf->idx + 1])))
		stf->pres = 0;
	else
	{
		stf->pres = ft_atoi(stf->str + (stf->idx + 1));
		stf->idx += (ft_num_count(stf->pres));
	}
}

void	print_argument(t_stf *stf)
{
	if (stf->str[stf->idx] == 'c')
		print_c(stf);
	else if (stf->str[stf->idx] == 'p')
		print_p(stf);
	else if (stf->str[stf->idx] == 'u')
		print_u(stf);
	else if (stf->str[stf->idx] == 'o')
		print_o(stf);
	else if (stf->str[stf->idx] == '%')
		print_pr(stf);
	else if (ft_charmequ(stf->str[stf->idx], "sS"))
		print_s(stf);
	else if (ft_charmequ(stf->str[stf->idx], "fF"))
		print_f(stf);
	else if (ft_charmequ(stf->str[stf->idx], "di"))
		print_d(stf);
	else if (ft_charmequ(stf->str[stf->idx], "xX"))
		print_x(stf);
}

void	ft_inc_hash(t_stf *stf, char **str, unsigned long long num)
{
	char *tmp;

	tmp = ft_strdup(*str);
	if (stf->flags[0] == '#')
		ft_strdel(&*str);
	if (stf->flags[0] == '#' && num != 0 && stf->str[stf->idx] == 'X')
		*str = ft_strjoin("0X", tmp);
	if (stf->flags[0] == '#' && num != 0 && stf->str[stf->idx] == 'x')
		*str = ft_strjoin("0x", tmp);
	if (stf->flags[0] == '#' && num == 0 &&
		ft_charmequ(stf->str[stf->idx], "xX") && stf->pres != 0)
		*str = ft_strdup(tmp);
	if (stf->flags[0] == '#' && stf->str[stf->idx] == 'o')
	{
		if (num == 0)
			*str = ft_strdup("0");
		else
			*str = ft_strjoin("0", tmp);
	}
	if (stf->flags[0] == '#' && stf->pres == 0 && stf->str[stf->idx] == 'f')
		*str = ft_strjoin(tmp, ".");
	ft_strdel(&tmp);
}

void	ft_add_space(t_stf *stf, char **str, long long num, int count)
{
	char	*tmp;
	char	*tmp1;

	tmp = ft_strdup(*str);
	if (stf->flags[4] == ' ' && num >= 0 && stf->flags[1] != '+'
		&& stf->width <= (int)ft_strlen(*str))
	{
		if (count > 0 && stf->width > count && stf->width > stf->pres
			&& (*str[0] == '0' || *str[0] == ' '))
			*str[0] = ' ';
		else
		{
			ft_strdel(&*str);
			*str = ft_strjoin(" ", tmp);
			if (stf->width > count && stf->width > stf->pres
				&& stf->flags[2] == '-')
			{
				tmp1 = *str;
				tmp1[(ft_strlen(*str) - 1)] = '\0';
			}
		}
	}
	ft_strdel(&tmp);
}
