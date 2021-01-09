/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   help_functions1.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/29 15:34:24 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:30:58 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

size_t		ft_f_count(unsigned long long n)
{
	size_t count;

	count = 1;
	while (((n > 0) || (n < 0)) && (n = n < 0 ? ((n * -1) / 10) : (n / 10)))
		count++;
	return (count);
}

char		*ft_str_space(t_stf *stf, char **str)
{
	char	*tmp;
	char	*tmp1;
	int		max;

	(stf->pres != -1 || stf->flags[2] == '-') ? stf->flags[3] = '\0' : 1;
	max = stf->width - ft_strlen(*str);
	tmp = ft_strdup(*str);
	ft_strdel(&*str);
	tmp1 = ft_strnew(max);
	if (stf->flags[3] == '0')
	{
		ft_memset(tmp1, '0', max);
		*str = ft_strjoin(tmp1, tmp);
	}
	else if (stf->flags[2] == '-' || stf->flags[2] != '-')
	{
		ft_memset(tmp1, ' ', max);
		*str = (stf->flags[2] == '-') ? ft_strjoin(tmp, tmp1)
		: ft_strjoin(tmp1, tmp);
	}
	ft_strdel(&tmp1);
	ft_strdel(&tmp);
	return (*str);
}

size_t		ft_num_count(long long n)
{
	size_t count;

	count = (n < 0) ? 2 : 1;
	while (((n > 0) || (n < 0)) && (n = n < 0 ? ((n * -1) / 10) : (n / 10)))
		count++;
	return (count);
}

void		ft_get_pres(t_stf *stf, char **str, int count)
{
	char *tmp;
	char *tmp1;

	if (stf->pres != -1)
	{
		if (*str[0] == '-')
			count--;
		if (stf->pres > count)
		{
			tmp = ft_strdup(*str);
			ft_strdel(&*str);
			tmp1 = ft_strnew(stf->pres - count);
			ft_memset(tmp1, '0', stf->pres - count);
			if (tmp[0] == '-' && (tmp[0] = '0'))
				tmp1[0] = '-';
			*str = ft_strjoin(tmp1, tmp);
			ft_strdel(&tmp1);
			ft_strdel(&tmp);
		}
		else if (stf->pres == 0 && *str[0] == '0' && stf->flags[0] != '#')
			ft_memset(*str, 0, ft_strlen(*str));
	}
}

long double	ft_change_prec(int prec, long double num)
{
	while (prec > 0)
	{
		num *= 10;
		prec--;
	}
	return (num);
}
