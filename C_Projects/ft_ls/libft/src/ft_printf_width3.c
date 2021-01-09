/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   width3.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/12/14 04:21:40 by blaine            #+#    #+#             */
/*   Updated: 2020/01/30 22:39:16 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_f_flags_sub1(t_stf *stf, char **str)
{
	int		max;
	char	*tmp;
	char	*tmp1;

	tmp = ft_strdup(*str);
	ft_strdel(&*str);
	if (stf->flags[2] == '-')
	{
		max = stf->width - ft_strlen(tmp);
		tmp1 = ft_strnew(max);
		ft_memset(tmp1, ' ', max);
		*str = ft_strjoin(tmp, tmp1);
		ft_strdel(&tmp1);
	}
	else if (stf->flags[2] != '-')
	{
		max = stf->width - ft_strlen(tmp);
		tmp1 = ft_strnew(max);
		(stf->flags[3] == '0') ? ft_memset(tmp1, '0', max)
		: ft_memset(tmp1, ' ', max);
		*str = ft_strjoin(tmp1, tmp);
		ft_strdel(&tmp1);
	}
	ft_strdel(&tmp);
}

void	ft_f_flags_sub3(t_stf *stf, char **str, long double num)
{
	int		max;
	char	*tmp;
	char	*tmp1;

	tmp = ft_strdup(*str);
	ft_strdel(&*str);
	max = stf->width - ft_strlen(tmp) - 1;
	(num < 0) ? max++ : 1;
	if (num > 0)
	{
		*str = ft_strjoin("+", tmp);
		ft_strdel(&tmp);
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
	}
	tmp1 = ft_strnew(max);
	ft_memset(tmp1, ' ', max);
	*str = ft_strjoin(tmp, tmp1);
	ft_strdel(&tmp);
	ft_strdel(&tmp1);
}

void	ft_f_flags_sub2(t_stf *stf, char **str, long double num)
{
	int		max;
	char	*tmp;
	char	*tmp1;

	if (stf->flags[2] == '-')
	{
		ft_f_flags_sub3(stf, str, num);
	}
	else if (stf->flags[2] != '-')
	{
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		max = stf->width - ft_strlen(tmp);
		tmp1 = ft_strnew(max);
		(stf->flags[3] == '0') ? ft_memset(tmp1, '0', max)
		: ft_memset(tmp1, ' ', max);
		if (num < 0 && stf->flags[3] == '0' && (tmp1[0] = '-'))
			tmp[0] = '0';
		else if (num > 0)
			(stf->flags[3] == '0') ? (tmp1[0] = '+')
			: (tmp1[max - 1] = '+');
		*str = ft_strjoin(tmp1, tmp);
		ft_strdel(&tmp);
		ft_strdel(&tmp1);
	}
}

void	ft_f_space(t_stf *stf, char **str, long double num, int count)
{
	char *tmp;

	tmp = ft_strdup(*str);
	if (stf->pres == -1)
		stf->pres = 6;
	if (stf->flags[3] == '0' && stf->flags[4] == ' '
		&& stf->width > (stf->pres + 1 + count))
		*str[0] = ' ';
	if (stf->flags[4] == ' ' && num >= 0 && stf->flags[1] != '+'
		&& stf->width <= (stf->pres + 1 + count))
	{
		ft_strdel(&*str);
		*str = ft_strjoin(" ", tmp);
	}
	ft_strdel(&tmp);
}

void	ft_f_flags(t_stf *stf, char **str, long double num)
{
	char *tmp;

	if (stf->width > (int)ft_strlen(*str) && num > 0 && stf->flags[1] != '+')
		ft_f_flags_sub1(stf, str);
	else if (stf->width >= ((int)ft_strlen(*str) + 1) && (num < 0
		|| stf->flags[1] == '+'))
	{
		ft_f_flags_sub2(stf, str, num);
	}
	else if (stf->width < (int)ft_strlen(*str) && num >= 0
		&& stf->flags[1] == '+')
	{
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		*str = ft_strjoin("+", tmp);
		ft_strdel(&tmp);
	}
}
