/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   width2.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/12/13 19:14:57 by blaine            #+#    #+#             */
/*   Updated: 2020/01/30 22:34:36 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_neg_sub5(t_stf *stf, char **str, int cnt, char *front)
{
	int		max;
	char	*tmp;

	tmp = ft_strdup(*str);
	ft_strdel(&*str);
	max = stf->pres - cnt + 1;
	front = ft_strnew(max);
	tmp[0] = '0';
	ft_memset(front, '0', max);
	front[0] = '-';
	*str = ft_strjoin(front, tmp);
	ft_strdel(&tmp);
	ft_strdel(&front);
	if (stf->width > stf->pres)
	{
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		max = stf->width - stf->pres - 1;
		front = ft_strnew(max);
		ft_memset(front, ' ', max);
		*str = ft_strjoin(tmp, front);
		ft_strdel(&tmp);
	}
	ft_strdel(&front);
}

void	ft_neg_sub1(t_stf *stf, char **str, int cnt, char *front)
{
	int		max;
	char	*tmp;

	if (stf->pres == cnt && stf->width > stf->pres)
	{
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		max = stf->width - cnt;
		front = ft_strnew(max);
		ft_memset(front, ' ', max);
		*str = ft_strjoin(tmp, front);
		ft_strdel(&tmp);
		ft_strdel(&front);
	}
	else if (stf->pres >= cnt)
		ft_neg_sub5(stf, str, cnt, front);
}

void	ft_neg_sub4(t_stf *stf, char **str, int cnt, char *front)
{
	int		max;
	char	*tmp;

	tmp = ft_strdup(*str);
	ft_strdel(&*str);
	max = stf->pres - cnt + 1;
	front = ft_strnew(max);
	tmp[0] = '0';
	ft_memset(front, '0', max);
	front[0] = '-';
	*str = ft_strjoin(front, tmp);
	ft_strdel(&tmp);
	if (stf->width > stf->pres)
	{
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		ft_strdel(&front);
		max = stf->width - stf->pres - 1;
		front = ft_strnew(max);
		ft_memset(front, ' ', max);
		*str = ft_strjoin(front, tmp);
		ft_strdel(&tmp);
	}
	ft_strdel(&front);
}

void	ft_neg_sub2(t_stf *stf, char **str, int cnt, char *front)
{
	int		max;
	char	*tmp;

	if (stf->pres == cnt && stf->width > stf->pres)
	{
		tmp = ft_strdup(*str);
		ft_strdel(&*str);
		max = stf->width - cnt;
		front = ft_strnew(max);
		ft_memset(front, ' ', max);
		*str = ft_strjoin(front, tmp);
		ft_strdel(&tmp);
		ft_strdel(&front);
	}
	else if (stf->pres >= cnt)
		ft_neg_sub4(stf, str, cnt, front);
}

void	ft_neg_sub3(t_stf *stf, char **str, int cnt)
{
	int		max;
	char	*tmp;
	char	*front;

	tmp = ft_strdup(*str);
	ft_strdel(&*str);
	max = stf->width - cnt;
	front = ft_strnew(max);
	(stf->flags[3] == '0') ? ft_memset(front, '0', max)
	: ft_memset(front, ' ', max);
	if (stf->flags[3] == '0')
	{
		tmp[0] = '0';
		front[0] = '-';
	}
	*str = ft_strjoin(front, tmp);
	ft_strdel(&tmp);
	ft_strdel(&front);
}
